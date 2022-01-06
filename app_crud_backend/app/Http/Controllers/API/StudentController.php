<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $students = Student::all();
        return response()->json([
            'status'=> 200,
            'students'=>$students,
        ]);
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'fullname'=>'required|max:191',
            'email'=>'required|email|max:191',
            'phone'=>'required|max:10|min:10',
            'address'=>'required|max:191',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->getMessageBag(),
            ]);
        }
        else
        {
            $student = new Student;
            $student->fullname = $request->input('fullname');
            $student->email = $request->input('email');
            $student->phone = $request->input('phone');
            $student->address = $request->input('address');
            $student->save();

            return response()->json([
                'status'=> 200,
                'message'=>'Student Added Successfully',
            ]);
        }
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $student = Student::find($id);
        if($student)
        {
            return response()->json([
                'status'=> 200,
                'student' => $student,
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No Student ID Found',
            ]);
        }
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'fullname'=>'required|max:191',
            'email'=>'required|email|max:191',
            'phone'=>'required|max:10|min:10',
            'address'=>'required|max:191',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validationErrors'=> $validator->getMessageBag(),
            ]);
        }
        else
        {
            $student = Student::find($id);
            if($student)
            {

                $student->name = $request->input('fullname');
                $student->email = $request->input('email');
                $student->phone = $request->input('phone');
                $student->address = $request->input('address');
                $student->update();

                return response()->json([
                    'status'=> 200,
                    'message'=>'Student Updated Successfully',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=> 404,
                    'message' => 'No Student ID Found',
                ]);
            }
        }
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
        $student = Student::find($id);
        if($student)
        {
            $student->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'Student Deleted Successfully',
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No Student ID Found',
            ]);
        }
        //
    }
}
