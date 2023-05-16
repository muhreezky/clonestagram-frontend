import { Button } from "react-daisyui";
import { FaSignOutAlt } from "react-icons/fa";
import logout from "../api/logout";
import Swal from "sweetalert2";

export default function Logout () {
	const action = () => {
		Swal.fire({
			title: "Confirm",
			text: "Do you want to logout?",
			icon: "question",
			showDenyButton: true,
			denyButtonText: "No",
			confirmButtonText: "Yes"
		}).then ((res) => {
			if (res.isConfirmed) {
				logout();
				// navigate("/");
				window.location.reload();
			}
		});
	}

	return (
		<Button onClick={action} color="ghost" className="rounded-full">
			<FaSignOutAlt />
		</Button>
	)
}
