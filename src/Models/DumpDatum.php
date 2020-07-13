<?php

namespace AdrHumphreys\Telescope\Models;

use AdrHumphreys\Telescope\Middleware\RequestMiddleware;
use SilverStripe\ORM\DataObject;
use Symfony\Component\VarDumper\Cloner\VarCloner;
use Symfony\Component\VarDumper\Dumper\HtmlDumper;
use Symfony\Component\VarDumper\VarDumper;

/**
 * @property string Dump
 */
class DumpDatum extends DataObject implements APIResponse
{
    /**
     * @var string
     */
    private static $table_name = 'Telescope_Dump';

    /**
     * @var array
     */
    private static $db = [
        'Dump' => 'Text',
    ];

    /**
     * @var array
     */
    private static $has_one = [
        'RequestDatum' => RequestDatum::class,
    ];

    public static function dump($anything): void
    {
        VarDumper::dump($anything);
    }

    public static function recordDump(string $dump): void
    {
        static::create([
            'Dump' => $dump,
            'RequestDatumID' => RequestMiddleware::getRequestDatumID() ?? 0,
        ])->write();
    }

    public static function getDumpStyle(): string
    {
        return (new HtmlDumper())->dump((new VarCloner)->cloneVar(true), true);
    }

    public function getAPIData(bool $includeRelations = false): array
    {
        $data = [];
        // TODO: Actually implement relation data
        if ($includeRelations !== false) {
            $data['relationData'] = 'relationData';
        }

        return array_merge($data, [
           'id' => $this->ID,
           'dump' => $this->Dump,
           'created' => $this->Created,
        ]);
    }
}
