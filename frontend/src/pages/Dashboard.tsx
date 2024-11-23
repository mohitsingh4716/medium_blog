

import { Appbar } from "../components/Appbar";
import { useUserProfile } from "../hooks/useUserProfile";

export const Dashboard = () => {
    const { loading, userInfo } = useUserProfile();
    


    const numberOfPosts = 5;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userInfo) {
        return <div>Failed to load user information.</div>;
    }

    return (
        <div className="flex flex-col min-h-screen ">
            <Appbar />
            <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-12">

                <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
                <div className="space-y-2">
                    <div>
                        <span className="font-semibold">Name:</span> {userInfo.name}
                    </div>
                    <div>
                        <span className="font-semibold">Email:</span> {userInfo.email}
                    </div>
                    <div>
                        <span className="font-semibold">Description:</span> {userInfo?.description || "No description provided"}
                    </div>
                    <div>
                        <span className="font-semibold">Number of Posts:</span> {numberOfPosts}
                    </div>
                </div>
            </div>

        </div>

    );
};

