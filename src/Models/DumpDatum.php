<?php

namespace AdrHumphreys\Telescope\Models;

use AdrHumphreys\Telescope\Middleware\RequestMiddleware;
use SilverStripe\ORM\DataObject;
use Symfony\Component\VarDumper\VarDumper;

/**
 * @property string Dump
 */
class DumpDatum extends DataObject
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
    private static $belongs_to = [
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
}
