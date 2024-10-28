import { Link as RouterLink, useLocation } from "react-router-dom";
import { HStack, Link } from "@chakra-ui/react";
import { ListTodo, BarChart2, Settings as SettingsIcon } from "lucide-react";

export default function Navigation() {
  const location = useLocation();

  const links = [
    { path: "/", icon: <ListTodo size={20} />, label: "Tasks" },
    { path: "/stats", icon: <BarChart2 size={20} />, label: "Stats" },
    { path: "/settings", icon: <SettingsIcon size={20} />, label: "Settings" },
  ];

  return (
    <HStack spacing={6}>
      {links.map(({ path, icon, label }) => (
        <Link
          key={path}
          as={RouterLink}
          to={path}
          display="flex"
          alignItems="center"
          gap={2}
          color={location.pathname === path ? "blue.500" : "gray.500"}
          fontWeight={location.pathname === path ? "semibold" : "normal"}
          _hover={{ textDecoration: "none", color: "blue.500" }}
        >
          {icon}
          {label}
        </Link>
      ))}
    </HStack>
  );
}
