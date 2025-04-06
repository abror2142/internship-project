<?php

namespace App\Http\Middleware;

use App\Models\Log;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ActionLogger
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $action): Response
    {        
        $response = $next($request);
        
        if($request->user()->hasRole('user')){
            if(in_array($action, ['delete', 'search', 'upload'])) {
                $this->log($request, $response, $action);
            }
        }

        return $response;
    }

    public function log (Request $request, Response $response, $action) {
        Log::create([
            'action' => $action,
            'user_id' => $request->user()->id,
            'successful' => $response->isSuccessful()
        ]);
    }
}
