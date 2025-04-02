<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DailyReportResource extends JsonResource
{
   
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference_number' => $this->reference_number,
            'description' => $this->description,
            'time_from' => $this->time_from,
            'time_to' => $this->time_to,
            'date' => $this->date,
            'customer' => $this->customer->name,
            'property_type' => $this->property->name,
            'address' => $this->address,
            'status' => $this->status
        ];
    }
}
