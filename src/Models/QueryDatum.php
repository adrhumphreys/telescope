<?php

namespace AdrHumphreys\Telescope\Models;

use SilverStripe\ORM\DataObject;

/**
 * @property string Queries
 * @property int Amount
 * @property int RequestDatumID
 */
class QueryDatum extends DataObject implements APIResponse
{
    /**
     * @var string
     */
    private static $table_name = 'Telescope_Query';

    /**
     * @var array
     */
    private static $db = [
        'Queries' => 'Text',
        'Amount' => 'Int',
    ];

    /**
     * @var array
     */
    private static $has_one = [
        'RequestDatum' => RequestDatum::class,
    ];

    public function getAPIData(bool $includeRelations = false): array
    {
        return [];
    }
}
