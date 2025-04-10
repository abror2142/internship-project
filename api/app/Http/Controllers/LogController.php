<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLogRequest;
use App\Http\Requests\UpdateLogRequest;
use App\Models\Log;
use Illuminate\Http\Request;


class LogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Retrieving Logs
        $query = Log::query();
        
        // target => can be admin/user to see logs based on role.
        if($request->has('target')) {
            $query->where('target', $request->query('target'));
        }
        
        if($request->has('action')) {
            $query->where('action', $request->query('action'));
        }

        if($request->has('successful')) {
            $query->where('successful', (bool) $request->query('successful'));
        }
        
        if($request->has('userId')) {
            $query->where('user_id', $request->query('userId'));
        }

        return $query->with(['user:id,name,email'])->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLogRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Log $log)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLogRequest $request, Log $log)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Log $log)
    {
        //
    }
}
