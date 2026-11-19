<?php
// AI-assisted [AI-xx]
namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(private UserService $users) {}

    public function index(Request $request)
    {
        $data = $request->validate([
            'keyword' => ['nullable', 'string', 'max:100'],
            'page'    => ['nullable', 'integer', 'min:1'],
        ]);

        return response()->json(
            $this->users->list($data['keyword'] ?? null, (int) ($data['page'] ?? 1))
        );
    }
}