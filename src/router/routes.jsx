import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";

const routes = [
    {
        path: "/",
        content: "Home",
        icon: <HomeIcon />,
    },
    {
        path: "/services",
        content: "Service",
        icon: <LocalShippingIcon />,
    },
    {
        path: "/orders",
        content: "Order",
        icon: <AssignmentIcon />,
    },
];

export default routes;
