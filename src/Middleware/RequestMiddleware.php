<?php

namespace AdrHumphreys\Telescope\Middleware;

use AdrHumphreys\Telescope\Models\RequestDatum;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\Control\Middleware\HTTPMiddleware;

class RequestMiddleware implements HTTPMiddleware
{
    /**
     * This is the middleware function that is called by the framework and where
     * we hook into. We record the request and response.
     *
     * @param HTTPRequest $request
     * @param callable $delegate
     * @return HTTPResponse|mixed
     */
    public function process(HTTPRequest $request, callable $delegate)
    {
        $start = microtime(true);
        $requestDatum = RequestDatum::create();
        $requestDatum->HostName = $request->getHost();
        $requestDatum->Time = time();
        $requestDatum->Method = $request->httpMethod();
        $path = $request->getURL(true) ?? '/';
        $requestDatum->Path = $path !== '' ? $path : '/';
        $requestDatum->RequestHeaders = json_encode($request->getHeaders());
        $requestDatum->Payload = $request->getBody();
        $requestDatum->SessionBefore = json_encode($request->getSession()->getAll());

        /** @var HTTPResponse $response */
        $response = $delegate($request);

        $duration = microtime(true) - $start;

        $requestDatum->ResponseCode = $response->getStatusCode();
        $requestDatum->ResponseHeaders = json_encode($response->getHeaders());
        $requestDatum->Duration = round($duration * 1000);
        $requestDatum->Response = $response->getBody();
        $requestDatum->SessionAfter = json_encode($request->getSession()->getAll());

        $requestDatum->write();

        return $response;
    }
}
