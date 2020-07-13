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
 * @property string IPAddress the users IP
 * @property string MemoryUsed the peak of memory allocated by PHP
 * @method DumpDatum[]|HasManyList Dumps()
 * @method LogDatum[]|HasManyList Logs()
 */
class RequestDatum extends DataObject implements APIResponse
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
        'IPAddress' => 'Varchar(20)',
        'MemoryUsed' => 'Varchar(10)',
    ];

    /**
     * @var array
     */
    private static $has_many = [
        'Dumps' => DumpDatum::class,
        'Logs' => LogDatum::class,
    ];

    public function getAPIData(bool $includeRelations = false): array
    {
        $dumps = [];
        $dumpStyle = '';

        if ($this->Dumps()->count() > 0) {
            $dumpStyle = DumpDatum::getDumpStyle();

            foreach ($this->Dumps() as $dump) {
                $dumps[] = $dump->getAPIData();
            }
        }

        $logs = [];

        foreach ($this->Logs() as $log) {
            $logs[] = $log->getAPIData();
        }

        return [
            'happened' => $this->Time,
            'hostname' => $this->HostName,
            'method' => $this->Method,
            'status' => $this->ResponseCode,
            'path' => $this->Path,
            'duration' => $this->Duration,
            'requestHeaders' => $this->RequestHeaders,
            'responseHeaders' => $this->ResponseHeaders,
            'payload' => $this->Payload,
            'response' => $this->Response,
            'sessionBefore' => $this->SessionBefore,
            'sessionAfter' => $this->SessionAfter,
            'ipAddress' => $this->IPAddress,
            'memoryUsed' => $this->MemoryUsed,
            'dumps' => $dumps,
            'dumpStyle' => $dumpStyle,
            'logs' => $logs,
        ];
    }
}
