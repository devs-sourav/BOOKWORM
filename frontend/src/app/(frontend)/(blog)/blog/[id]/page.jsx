"use client";
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  ChevronLeft,
  Eye,
  MessageCircle,
  ThumbsUp,
  BookOpen,
  Star,
} from "lucide-react";

export default function BookBlogPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Book blog data
  const blogData = {
    title: "The Art of Slow Reading: Rediscovering Deep Literary Connection",
    subtitle: "Why rushing through books might be robbing you of literature's greatest gifts",
    author: {
      name: "Elena Martinez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Literary critic and avid reader with over 200 books reviewed. Advocate for mindful reading practices.",
    },
    publishDate: "July 20, 2025",
    readTime: "12 min read",
    views: "3.8k",
    comments: 47,
    category: "Reading Culture",
    tags: ["Reading", "Literature", "Mindfulness", "Book Reviews", "Literary Analysis"],
    featuredImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=600&fit=crop",
    content: `
In our age of instant gratification and endless scrolling, the act of reading has become another checkbox on our productivity lists. We celebrate reading 50, 100, or even 200 books a year, but are we truly absorbing the wisdom, beauty, and complexity that literature offers?

## The Rush to Consume vs. The Joy of Savoring

I recently spent three months reading Virginia Woolf's "To the Lighthouse" – not because I'm a slow reader, but because I discovered something magical happens when you don't rush through a masterpiece. Each re-reading of a passage revealed new layers, new connections, new moments of recognition that would have been impossible to catch in a single, hurried encounter.

**The Modern Reading Crisis**
Our digital age has conditioned us to consume content quickly. We skim articles, speed through audiobooks at 2x speed, and judge our literary worth by the number of books we complete annually. But quantity doesn't equal quality when it comes to genuine literary engagement.

## What Slow Reading Actually Means

Slow reading isn't about reading slowly – it's about reading intentionally. It means:

- **Pausing to reflect** on beautiful passages instead of rushing to the next page
- **Rereading sentences** that strike you as particularly meaningful
- **Allowing emotions** to fully develop as you experience the story
- **Making connections** between different parts of the text
- **Questioning the author's choices** and exploring alternative interpretations

## The Science Behind Deep Reading

Research from neuroscientist Maryanne Wolf shows that deep reading activates different neural pathways than skimming. When we read slowly and thoughtfully, our brains create richer neural networks, leading to:

### Cognitive Benefits
1. **Enhanced empathy** through deep character connection
2. **Improved critical thinking** skills
3. **Better memory retention** of complex narratives
4. **Increased vocabulary** through contextual learning

## Practical Techniques for Slow Reading

**The Marginalia Method**
Keep a pencil handy and mark passages that resonate with you. Write questions, observations, or emotional reactions in the margins. This transforms passive reading into active dialogue with the text.

**The Chapter Pause**
After finishing each chapter, close the book and spend five minutes reflecting. What happened? How did it make you feel? What questions arose? This simple practice deepens comprehension and emotional connection.

**The Rereading Ritual**
Don't be afraid to reread paragraphs, pages, or entire chapters. Great literature is designed to reward multiple readings. Each encounter reveals new depths.

## Books That Reward Slow Reading

Some books are perfect companions for slow reading practice:

- **"Beloved" by Toni Morrison** – Every sentence is crafted with surgical precision
- **"One Hundred Years of Solitude" by Gabriel García Márquez** – The magical realism unfolds like a dream
- **"The Brothers Karamazov" by Fyodor Dostoevsky** – Philosophical depths that require contemplation
- **"Middlemarch" by George Eliot** – Rich psychological portraits that develop slowly

## The Digital Dilemma

E-readers and audiobooks aren't enemies of slow reading – they're tools that can either help or hinder, depending on how we use them. The key is intentionality:

**For E-readers:**
- Turn off notifications and reading progress indicators
- Use the highlighting and note-taking features liberally
- Resist the urge to check reading statistics

**For Audiobooks:**
- Listen at normal speed (1x)
- Pause frequently to process what you've heard
- Consider switching between audio and text versions

## Creating a Slow Reading Environment

Your physical environment plays a crucial role in developing slow reading habits:

- **Designate a reading sanctuary** free from digital distractions
- **Set boundaries** with phones and other devices
- **Choose comfortable seating** that encourages longer sessions
- **Use natural lighting** when possible to reduce eye strain

## The Rewards of Patient Reading

When you slow down your reading practice, you'll discover that books become not just entertainment or information sources, but profound experiences that can change how you see the world. You'll find yourself:

- Remembering books years after reading them
- Developing stronger opinions about literary techniques
- Feeling more emotionally connected to characters
- Appreciating the craft of writing itself
- Building patience that extends beyond reading

## Conclusion: Quality Over Quantity

In a world obsessed with metrics and achievements, choosing to read slowly is a radical act of self-care and intellectual honesty. It's an acknowledgment that some experiences can't be rushed, that depth matters more than breadth, and that the journey through a book can be just as important as reaching the destination.

The next time you pick up a book, resist the urge to race through it. Instead, settle in for a conversation with the author that might take weeks or months to complete. You might be surprised by how much more you discover – not just in the book, but in yourself.

What's the last book that made you want to slow down and savor every word? Share your slow reading experiences in the comments below.
    `,
  };

  useEffect(() => {
    setLikes(Math.floor(Math.random() * 150) + 80);
  }, []);

  const handleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogData.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Book Blog", href: "/blog" },
    { label: "The Art of Slow Reading: Rediscovering Deep Literary Connection" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-amber-100">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-amber-600 hover:text-amber-800 transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-gray-600 font-medium">{item.label}</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Article Header */}
          <header className="p-8 bg-gradient-to-r from-amber-100 to-orange-100">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-amber-200 text-amber-800 text-sm font-semibold px-4 py-2 rounded-full">
                <BookOpen className="w-4 h-4" />
                {blogData.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {blogData.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-700 mb-6 leading-relaxed font-medium">
              {blogData.subtitle}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{blogData.publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blogData.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{blogData.views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{blogData.comments} comments</span>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={blogData.author.avatar}
                  alt={blogData.author.name}
                  className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {blogData.author.name}
                  </h3>
                  <p className="text-sm text-gray-600">{blogData.author.bio}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                    isLiked
                      ? "bg-red-50 text-red-600 border-red-200 shadow-md"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:shadow-md"
                  }`}
                >
                  <ThumbsUp
                    className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span className="font-medium">{likes}</span>
                </button>

                <button
                  onClick={handleBookmark}
                  className={`p-3 rounded-full border-2 transition-all duration-200 ${
                    isBookmarked
                      ? "bg-amber-50 text-amber-600 border-amber-200 shadow-md"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:shadow-md"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                  />
                </button>

                <button
                  onClick={handleShare}
                  className="p-3 rounded-full border-2 bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="px-8">
            <img
              src={blogData.featuredImage}
              alt="Featured image showing books and reading"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Article Content */}
          <article className="p-8">
            <div className="prose prose-lg max-w-none">
              {blogData.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("##")) {
                  return (
                    <h2
                      key={index}
                      className="text-3xl font-bold text-gray-900 mt-10 mb-6 pb-2 border-b-2 border-amber-200"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                } else if (paragraph.startsWith("###")) {
                  return (
                    <h3
                      key={index}
                      className="text-2xl font-semibold text-gray-800 mt-8 mb-4"
                    >
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                } else if (
                  paragraph.startsWith("**") &&
                  paragraph.endsWith("**")
                ) {
                  return (
                    <h4
                      key={index}
                      className="text-xl font-semibold text-amber-800 mt-6 mb-3 bg-amber-50 p-3 rounded-lg"
                    >
                      {paragraph.replace(/\*\*/g, "")}
                    </h4>
                  );
                } else if (paragraph.match(/^\d+\./)) {
                  const items = paragraph
                    .split("\n")
                    .filter((item) => item.trim());
                  return (
                    <ol
                      key={index}
                      className="list-decimal list-inside space-y-3 my-6 bg-gray-50 p-4 rounded-lg"
                    >
                      {items.map((item, i) => (
                        <li key={i} className="text-gray-700 leading-relaxed text-lg">
                          {item.replace(/^\d+\.\s/, "")}
                        </li>
                      ))}
                    </ol>
                  );
                } else if (paragraph.startsWith("- ")) {
                  const items = paragraph
                    .split("\n")
                    .filter((item) => item.trim());
                  return (
                    <ul
                      key={index}
                      className="list-disc list-inside space-y-3 my-6 bg-amber-50 p-4 rounded-lg"
                    >
                      {items.map((item, i) => (
                        <li key={i} className="text-gray-700 leading-relaxed text-lg">
                          {item.replace(/^-\s/, "")}
                        </li>
                      ))}
                    </ul>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p
                      key={index}
                      className="text-gray-700 leading-relaxed mb-6 text-lg"
                    >
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </article>

          {/* Tags */}
          <div className="px-8 mb-8">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-3">
                {blogData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white text-amber-700 rounded-full text-sm font-medium hover:bg-amber-100 transition-colors cursor-pointer shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Author Card */}
          <div className="mx-8 mb-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              About the Author
            </h3>
            <div className="flex items-start gap-6">
              <img
                src={blogData.author.avatar}
                alt={blogData.author.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  {blogData.author.name}
                </h4>
                <p className="text-gray-600 mb-4 leading-relaxed">{blogData.author.bio}</p>
                <button className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors font-semibold shadow-md">
                  Follow Author
                </button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mx-8 mb-8 bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Comments ({blogData.comments})
            </h3>
            <div className="border-t pt-6">
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Join the conversation about slow reading and share your favorite literary experiences.
                </p>
                <button className="mt-4 bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors font-semibold">
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
