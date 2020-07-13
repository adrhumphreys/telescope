<?php

namespace AdrHumphreys\Telescope\Controllers;

use AdrHumphreys\Telescope\Models\APIResponse;
use AdrHumphreys\Telescope\Models\LogDatum;
use AdrHumphreys\Telescope\Models\RequestDatum;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\ORM\DataObject;

class Api extends Controller
{
    // We want to limit the amount of data shown as it can get large quick
    // This is only applied to top level list responses and not detail ones
    private const LIMIT = 100;

    /**
     * @var string[]
     */
    private static $allowed_actions = [
        'index',
        'requests',
        'logs',
    ];

    public function index()
    {
        return 'hey 👋';
    }

    public function requests(HTTPRequest $request): HTTPResponse
    {
        if ($requestID = $request->param('ID')) {
            return $this->genericDetailResponse(RequestDatum::class, (int) $requestID);
        }

        $data = [];
        $requests = RequestDatum::get()
            ->exclude('Path:PartialMatch', '.map')
            ->limit(self::LIMIT)
            ->sort('Time', 'DESC');

        /** @var RequestDatum $request */
        foreach ($requests as $request) {
            $data[] = [
              'id' => $request->ID,
              'method' => $request->Method,
              'path' => $request->Path,
              'status' => $request->ResponseCode,
              'duration' => $request->Duration,
              'happened' => $request->Time,
            ];
        }

        return $this->generateJSONResponse($data);
    }

    public function logs(HTTPRequest $request): HTTPResponse
    {
        if ($logID = $request->param('ID')) {
            return $this->genericDetailResponse(LogDatum::class, (int) $logID);
        }

        $data = [];
        $logs = LogDatum::get()
            ->sort('Created', 'DESC')
            ->limit(self::LIMIT);

        /** @var LogDatum $log */
        foreach ($logs as $log) {
            $data[] = [
                'id' => $log->ID,
                'entry' => $log->Entry,
                'level' => $log->Level,
                'created' => $log->Created,
            ];
        }

        return $this->generateJSONResponse($data);
    }

    private function genericDetailResponse(string $className, int $id): HTTPResponse
    {
        $object = DataObject::get_by_id($className, $id);

        if ($object === null) {
            $this->httpError(404, 'No ' . $className .' found for id ' . $id);
        }

        if (!$object instanceof APIResponse) {
            $this->httpError(404, 'No api response available for ' . $className);
        }

        return $this->generateJSONResponse($object->getAPIData(true));
    }

    private function generateJSONResponse(?array $data): HTTPResponse
    {
        $response = HTTPResponse::create();
        $response->setStatusCode(200);
        $response->setBody(json_encode($data));
        $response->addHeader('Content-Type', 'application/json');

        return $response;
    }
}
