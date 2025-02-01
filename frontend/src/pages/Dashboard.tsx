import moment from "moment";
import { Appbar } from "../components/Appbar";
import { useUserPost } from "../hooks/useUserPost";
import { useUserProfile } from "../hooks/useUserProfile";
import DashboardLoading from "../Loadings/DashboardLoading";

export const Dashboard = () => {
  const { userInfo } = useUserProfile();

  const { loading, posts } = useUserPost();

  if (loading) {
    return <DashboardLoading />;
  }

  const recentPosts = posts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!userInfo) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load user information.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-6 ">
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-12 border-t-4 border-gray-500">
          <h1 className="text-4xl font-extrabold text-gray-700 mb-6">
            User Dashboard
          </h1>
          <div className="space-y-5">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-medium text-lg text-gray-800">Name:</span>
              <span className="text-gray-600">{userInfo.name}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-medium text-lg text-gray-800">Email:</span>
              <span className="text-gray-600">{userInfo.email}</span>
            </div>

            <div className="md:flex inline-block md:text-justify justify-between border-b pb-3">
              <span className="font-medium text-lg text-gray-800">
                Description:
              </span>
              <span className="text-gray-500">
                {userInfo.description || "No description provided"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-lg text-gray-800">
                Number of Posts:
              </span>
              <span className="text-gray-600 text-lg font-semibold">
                {posts.length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1 md:col-span-2 mt-12 border-t-4 border-gray-500">
          <h2 className="text-3xl font-semibold text-gray-600 mb-4">
            Recent Posts
          </h2>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="border-b pb-4 flex items-center space-x-4"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {post.title}
                  </h3>
                  <div className="pt-1 pl-2 font-extralight text-slate-500 hover:text-slate-800 text-sm">
                    {getTimeDifference(post.createdAt.toString())}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const getTimeDifference = (createdAt: moment.MomentInput) => {
  const currentTime = new Date();
  const uploadTime = moment(createdAt).toDate();
  const diffInMs = currentTime.getTime() - uploadTime.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInMinutes < 1) {
    return `${diffInSeconds} sec ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hr ago`;
  } else {
    return moment(createdAt).format("dddd, Do MMM, YYYY");
  }
};
