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
        } else {
            $query->where('target', 'user');
        }
        
        if($request->has('action')) {
            $query->where('action', $request->query('action'));
        }

        if($request->has('status')) {
            if($request->get('status') === 'successful'){
                $query->where('successful', 1);
            } else if($request->get('status') === 'failed') {
                $query->where('successful', 0);
            }
        }
        
        if($request->has('userId')) {
            $query->where('user_id', $request->query('userId'));
        }

        if($request->query('fromDate')) {
            $query->where('created_at', '>=', $request->query('fromDate')); 
        }
        if($request->query('toDate')) {
            $query->where('created_at', '<', $request->query('toDate')); 
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
