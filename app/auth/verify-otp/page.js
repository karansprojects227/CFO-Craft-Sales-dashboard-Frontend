"use client";

import { Suspense } from "react";
import SearchParamClient from "./SearchParamClient";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamClient />
    </Suspense>
  );
}
    
