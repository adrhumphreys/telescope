<?php

namespace AdrHumphreys\Telescope\Models;

use SilverStripe\ORM\DataObject;

/**
 * @property string Entry
 * @property string Level
 * @property string Context
 * @property int RequestDatumID
 */
class LogDatum extends DataObject implements APIResponse
{
    /**
     * @var string
     */
    private static $table_name = 'Telescope_Log';

    /**
     * @var array
     */
    private static $db = [
        'Entry' => 'Text',
        'Level' => 'Varchar',
        'Context' => 'Text',
    ];

    /**
     * @var array
     */
    private static $has_one = [
        'RequestDatum' => RequestDatum::class,
    ];

    public function getAPIData(bool $includeRelations = false): array
    {
        $data = [];

        if ($includeRelations !== false) {
            $data['requestID'] = $this->RequestDatumID ?? 0;
        }

        return array_merge($data, [
            'id' => $this->ID,
            'entry' => $this->Entry,
            'level' => $this->Level,
            'created' => $this->Created,
            'context' => $this->Context,
        ]);
    }
}
