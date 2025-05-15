import { Alert } from "flowbite-react";
import { FaCircleInfo } from "react-icons/fa6";

export default function EmptyState() {
    return(<>
    <Alert color="warning" icon={FaCircleInfo} >
                محتوایی برای نمایش موجود نمی باشد
    </Alert>
    </>);
}
