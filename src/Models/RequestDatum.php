<?php

namespace AdrHumphreys\Telescope\Models;

use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\HasManyList;

/**
 * @property string ResponseCode the response code
 * @property string Time when the request was started
 * @property string HostName
 * @property string Method e.g. PUT,GET,etc
 * @property string Path the requested path
 * @property string Duration the time in ms to generate the response
 * @property string RequestHeaders json encoded array of the headers
 * @property string ResponseHeaders json encoded array of the headers
 * @property string Payload for example the form data
 * @property string Response the response body
 * @property string SessionBefore the response body
 * @property string SessionAfter the response body
 * @method DumpDatum[]|HasManyList Dumps()
 */
class RequestDatum extends DataObject
{
    /**
     * @var string
     */
    private static $table_name = 'Telescope_Request';

    /**
     * @var array
     */
    private static $db = [
        'ResponseCode' => 'Varchar(3)',
        'HostName' => 'Varchar(250)',
        'Time' => 'DBDatetime',
        'Method' => 'Varchar(10)',
        'Path' => 'Varchar(255)',
        'Duration' => 'Int',
        'RequestHeaders' => 'Text',
        'ResponseHeaders' => 'Text',
        'Payload' => 'Text',
        'Response' => 'Text',
        'SessionBefore' => 'Text',
        'SessionAfter' => 'Text',
    ];

    /**
     * @var array
     */
    private static $has_many = [
        'Dumps' => DumpDatum::class,
    ];
}
