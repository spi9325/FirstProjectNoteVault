import { Suspense } from "react";
import {ViewPage} from "../components/ViewPage";

export default function Page() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <ViewPage />
            </Suspense>
        </div>
    )
}