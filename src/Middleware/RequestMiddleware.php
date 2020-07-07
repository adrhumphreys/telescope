<?php

namespace AdrHumphreys\Telescope\Middleware;

use AdrHumphreys\Telescope\Models\RequestDatum;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\Control\Middleware\HTTPMiddleware;

class RequestMiddleware implements HTTPMiddleware
{
    private const IGNORED_PATHs = [
        'dev/telescope',
        'dev/build'
    ];

    /**
     * @var int|null
     */
    private static $requestDatumID = null;

    /**
     * This is the middleware function that is called by the framework and where
     * we hook into. We record the request and response.
     *
     * @param HTTPRequest $request
     * @param callable $delegate
     * @return HTTPResponse|mixed
     * @throws \SilverStripe\ORM\ValidationException
     */
    public function process(HTTPRequest $request, callable $delegate)
    {
        $path = $request->getURL(true) ?? '/';

        if (self::shouldProcessPath($path) === false) {
            return $delegate($request);
        }

        $start = microtime(true);
        $requestDatum = RequestDatum::create();
        $requestDatum->HostName = $request->getHost();
        $requestDatum->Time = time();
        $requestDatum->Method = $request->httpMethod();
        $requestDatum->Path = $path !== '' ? $path : '/';
        $requestDatum->RequestHeaders = json_encode($request->getHeaders());
        $requestDatum->Payload = $request->getBody();
        $requestDatum->SessionBefore = json_encode($request->getSession()->getAll());
        $requestDatum->write();
        self::$requestDatumID = $requestDatum->ID;

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

    public static function getRequestDatumID(): ?int
    {
        return self::$requestDatumID;
    }

    /*
     * Some requests we want to ignore (for example viewing the telescope results)
     */
    private static function shouldProcessPath(string $path): bool
    {
        foreach(self::IGNORED_PATHs as $ignoredPath) {
            if (strpos($path, $ignoredPath) !== false){
                return false;
            }
        }

        return true;
    }
}
