<?php

namespace AdrHumphreys\Telescope\Handlers;

use AdrHumphreys\Telescope\Middleware\RequestMiddleware;
use AdrHumphreys\Telescope\Models\LogDatum;
use Monolog\Formatter\JsonFormatter;
use Monolog\Handler\AbstractProcessingHandler;
use Monolog\Logger;
use Monolog\Processor\IntrospectionProcessor;

class LogHandler extends AbstractProcessingHandler
{
    /*
     * Add the info to know where the message was sent from
     */
    public function handle(array $record)
    {
        $this->pushProcessor(new IntrospectionProcessor(Logger::DEBUG, ['AdrHumphreys\\']));
        return parent::handle($record);
    }

    protected function getDefaultFormatter()
    {
        $formatter = new JsonFormatter;
        $formatter->includeStacktraces(true);

        return $formatter;
    }

    protected function write(array $record)
    {
        $logDatum = LogDatum::create();
        $logDatum->Entry = (string) $record['formatted'];
        $logDatum->Level = (string) $record['level_name'];
        $logDatum->Context = (string) $this->getContext($record['extra']['file'], $record['extra']['line']);
        $logDatum->RequestDatumID = RequestMiddleware::getRequestDatumID();
        $logDatum->write();
    }

    public function getContext(string $filePath, int $line): ?string
    {
        $file = file_get_contents($filePath);

        if ($file === false) {
            return 'No context';
        }

        $lines = explode("\n", $file);

        return implode(PHP_EOL, array_slice($lines, max(0, $line - 20), 30));
    }
}
