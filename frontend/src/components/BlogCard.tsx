import parse from "html-react-parser";
import { Sparkle } from "lucide-react";
import moment from "moment";
import { Link } from "react-router-dom";

export interface BlogCardProps {
  id: string;
  authorName: string;
  authorId?: string;
  description?: string;
  title: string;
  content: string;
  firstImgUrl?: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  authorId,
  title,
  content,
  firstImgUrl,
  publishedDate,
}: BlogCardProps) => {
  const plainTextContent = stripHtmlTags(content);
  // Calculate reading time based on 225 words per minute
  const wordCount = plainTextContent.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 225));
  
  const shortTitle = title.length > 70 ? title.slice(0, 70) + "..." : title;
  const shortExcerpt = plainTextContent.length > 140 ? plainTextContent.slice(0, 140) + "..." : plainTextContent;

  return (
    <article className="group bg-white py-6 border-b border-zinc-100 hover:bg-zinc-50/30 transition-all duration-200">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
        
        {/* Text area */}
        <div className="flex-1 min-w-0">
          
          {/* Author Meta Row */}
          <div className="flex items-center gap-2 mb-2.5 text-xs">
            <Link to={authorId ? `/profile/${authorId}` : "#"} className="hover:opacity-85 transition-opacity">
              <Avatar name={authorName} size="small" />
            </Link>
            <div className="flex items-center gap-1 text-zinc-500 font-medium">
              <Link to={authorId ? `/profile/${authorId}` : "#"} className="hover:text-zinc-950 hover:underline transition-all">
                {authorName}
              </Link>
              <span className="text-zinc-300">•</span>
              <span className="text-zinc-400 font-light">{getTimeDifference(publishedDate)}</span>
            </div>
          </div>

          {/* Title and Excerpt */}
          <Link to={`/blog/${id}`} className="block group/title">
            <h2 className="text-xl font-bold text-zinc-950 font-serif leading-snug tracking-tight mb-2 group-hover/title:text-emerald-700 transition-colors">
              {shortTitle}
            </h2>
            <p className="text-sm text-zinc-500 font-light leading-relaxed mb-4 line-clamp-2">
              {parse(shortExcerpt)}
            </p>
          </Link>

          {/* Footer details */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-light">
            <Sparkle className="w-3.5 h-3.5 text-zinc-300" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Cover Image thumbnail */}
        {firstImgUrl && (
          <Link to={`/blog/${id}`} className="shrink-0 w-full md:w-36 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 hover:opacity-95 transition-opacity">
            <img
              src={firstImgUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
          </Link>
        )}
      </div>
    </article>
  );
};

const stripHtmlTags = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

export function Avatar({
  name,
  size,
}: {
  name: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "small" ? "w-6 h-6 text-[10px]" : "w-10 h-10 text-sm"
      } overflow-hidden rounded-full border border-zinc-200 bg-zinc-100 shrink-0`}
    >
      <span className="font-semibold text-zinc-600">
        {name[0]?.toUpperCase() || "?"}
      </span>
    </div>
  );
}

const getTimeDifference = (createdAt: moment.MomentInput) => {
  const currentTime = new Date();
  const uploadTime = moment(createdAt).toDate();
  const diffInMs = currentTime.getTime() - uploadTime.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInMinutes < 1) {
    return `Just now`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    return moment(createdAt).format("MMM D, YYYY");
  }
};