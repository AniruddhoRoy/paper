import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { 
    HiArrowLeftOnRectangle,
    HiUsers,
 } from "react-icons/hi2";
 import {signOut} from "next-auth/react"
 import useConversationId from "./useConversation";
