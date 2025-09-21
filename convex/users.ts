import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get user by their Clerk user ID
export const getUserByClerkId = query({
  args: { userId: v.string() },
  handler: async (ctx,{ userId }) => {
    if (!userId) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
  },
});

// Create or update user 

export const upsertUser = mutation({
    args: {
        userId: v.string(),
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    },
    handler: async (ctx, { userId, name, email, imageUrl }) => {
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first();

        if (existingUser) {
            await ctx.db.patch(existingUser._id, { name, imageUrl});
            return existingUser._id;
        }
        return await ctx.db.insert("users", { userId, name, email, imageUrl });
    },
});

// Search users by name or email
export const searchUsers = query({
    args: { searchTerm: v.string() },
    handler: async (ctx, { searchTerm }) => {
        if (!searchTerm.trim()) return [];

        const lowerSearchTerm = searchTerm.toLowerCase().trim();

        // get all users and filter by name or email
        const allUsers = await ctx.db.query("users").collect();

        return allUsers
            .filter(
                (user) =>
                    user.name.toLowerCase().includes(lowerSearchTerm) ||
                    user.email.toLowerCase().includes(lowerSearchTerm)
            )
            .slice(0, 20); // limit to 20 results
    },
});