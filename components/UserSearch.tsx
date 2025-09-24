"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { useUserSearch } from "@/hooks/useUserSearch";

function UserSearch({
    onSelectUser,
    placeholder = "Search users by name or email",
    className,
} : {
    onSelectUser: (user: Doc<"users">) => void;
    placeholder?: string;
    className?: string;
}) {
    const {searchTerm, setSearchTerm, searchResults, isLoading} = useUserSearch();
  return (
    <div>UserSearch</div>
  )
}

export default UserSearch;