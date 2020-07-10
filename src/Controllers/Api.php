<?php

namespace AdrHumphreys\Telescope\Controllers;

use AdrHumphreys\Telescope\Models\RequestDatum;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;

class Api extends Controller
{
    /**
     * @var string[]
     */
    private static $allowed_actions = [
        'index',
        'requests',
    ];

    public function index()
    {
        return 'hey 👋';
    }

    public function requests(HTTPRequest $request): HTTPResponse
    {
        if ($requestID = $request->param('ID')) {
            return $this->getRequestDetails((int) $requestID);
        }

        $data = [];
        $requests = RequestDatum::get()
            ->filter('ResponseCode', 200)
            ->sort('Time', 'DESC')
            ->limit(10);

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

    private function getRequestDetails(int $requestID): HTTPResponse
    {
        $request = RequestDatum::get_by_id($requestID);

        if ($request === null) {
            $this->httpError(404, 'No request found for request ' . $requestID);
        }

        return $this->generateJSONResponse($request->getAPIData());
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
