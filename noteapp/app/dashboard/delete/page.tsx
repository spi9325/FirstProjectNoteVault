import { Suspense } from "react";
import {DeletePage} from "../components/DeletePage";

export default function Page() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <DeletePage />
            </Suspense>
        </div>
    )
}