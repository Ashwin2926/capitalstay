import React from 'react';
import { Zap, Award, Globe, Heart, Building2, UserCheck, ChevronRight } from 'lucide-react';
import PageHeader from "../Pageheader/PageHeader"; 

// --- Theme Tokens ---
const tokens = {
    color: {
        primary: '#007bff', 
        bgLight: '#FFFFFF',
        bgSecondary: '#F5F5F5', 
        textDark: '#111111',
        textMuted: '#555555',
        shadowPrimary: 'rgba(0, 123, 255, 0.3)',
    },
    spacing: {
        maxWidth: '1200px',
        padding: '20px',
    }
};

// --- Sample News and Accomplishments Data (Updated with image fields) ---
const NEWS_FEED: NewsFeedItem[] = [
    {
        id: 1,
        date: 'Oct 25, 2025',
        type: 'Award',
        icon: Award,
        title: 'Voted Dubai\'s "Best Luxury Short-Term Rental Provider"',
        content: 'Capital Stay secured the prestigious industry award for outstanding guest satisfaction and portfolio growth for the third year running.',
        image: 'https://images.unsplash.com/photo-1542838132-8408a2872322?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Placeholder: Award ceremony
    },
    {
        id: 2,
        date: 'Nov 01, 2025',
        type: 'Portfolio',
        icon: Building2,
        title: 'Exclusive Partnership: 15 New Units in Palm Jumeirah',
        content: 'We successfully onboarded 15 new luxury villas and apartments in the Fronds and Signature Villas area, significantly expanding our ultra-luxury offering.',
        image: 'https://images.unsplash.com/photo-1579294523724-c1ce53a1a1f4?q=80&w=1543&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Placeholder: Palm Jumeirah view
    },
    {
        id: 3,
        date: 'Nov 15, 2025',
        type: 'Service',
        icon: UserCheck,
        title: 'New Dedicated VIP Concierge Service Launched',
        content: 'To better serve our high-net-worth clients, we rolled out a 24/7 dedicated concierge service, setting a new benchmark for personalized guest experiences.',
        image: 'https://images.unsplash.com/photo-1543162794-55060868f766?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Placeholder: Concierge staff
    },
    {
        id: 4,
        date: 'Dec 03, 2025',
        type: 'Guest Story',
        icon: Heart,
        title: 'Record-Breaking 5-Star Review Streak',
        content: 'Achieved a company-wide streak of 450 consecutive 5-star reviews across all major booking platforms, reflecting our commitment to flawless stays.',
        image: 'https://images.unsplash.com/photo-1557425955-df1390f70df9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Placeholder: Happy guests/review screenshot
    },
    {
        id: 5,
        date: 'Dec 10, 2025',
        type: 'Partnership',
        icon: Globe,
        title: 'Global Travel Agent Network Integration Complete',
        content: 'Our inventory is now fully integrated into three major global luxury travel agent networks, enhancing our international visibility and direct bookings.',
        image: 'https://images.unsplash.com/photo-1517430155734-fe56a427f27a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Placeholder: Globe/Travel Network
    },
    {
        id: 6,
        date: 'Dec 15, 2025',
        type: 'Innovation',
        icon: Zap,
        title: 'AI-Powered Dynamic Pricing System Deployed',
        content: 'We implemented a proprietary AI model to optimize rental yields, resulting in an average revenue increase of 12% for managed properties.',
        image: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Placeholder: Data/AI imagery
    },
];

interface NewsFeedItem {
    id: number;
    date: string;
    type: NewsType;
    icon: React.ComponentType<{ size?: number; color?: string }>;
    title: string;
    content: string;
    image: string;
}

type NewsType = 
    | 'Award'
    | 'Portfolio'
    | 'Service'
    | 'Guest Story'
    | 'Partnership'
    | 'Innovation';

const getIconColor = (type: NewsType): string => {
    switch (type) {
        case 'Award': return '#FFD700'; 
        case 'Portfolio': return tokens.color.primary; 
        case 'Service': return '#22C55E'; 
        case 'Guest Story': return '#EF4444'; 
        case 'Partnership': return '#8B5CF6'; 
        case 'Innovation': return '#F97316'; 
        default: return tokens.color.primary;
    }
};

// --- Single News Card Component (Updated to include image) ---
interface NewsCardProps {
    item: NewsFeedItem;
    index: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, index }) => {
    const Icon = item.icon;
    const iconColor = getIconColor(item.type);

    return (
        <a 
            href="#" // Placeholder link to the full news story
            className="news-card" 
            style={{ animationDelay: `${index * 0.1}s` }}
        > 
            <div className="news-image-container">
                <img src={item.image} alt={item.title} className="news-image" />
                <div className="news-icon-overlay" style={{ backgroundColor: iconColor }}>
                    <Icon size={24} color={tokens.color.bgLight} />
                </div>
            </div>

            <div className="news-content">
                <p className="news-date">{item.date} — <span className="news-type" style={{ color: iconColor }}>{item.type}</span></p>
                <h3 className="news-title">{item.title}</h3>
                <p className="news-description">{item.content}</p>
                <div className="news-card-cta">
                    View Details 
                    <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                </div>
            </div>
        </a>
    );
};


// --- Main Page Component ---
const NewsAndAccomplishments = () => (
    <div className="news-page-wrapper">
        <style>{`
            /* --- KEYFRAMES --- */
            @keyframes fadeInSlideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes pulseShadow {
                0% { box-shadow: 0 4px 15px rgba(0, 123, 255, 0.1); }
                50% { box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3); }
                100% { box-shadow: 0 4px 15px rgba(0, 123, 255, 0.1); }
            }

            /* --- Base & Wrapper --- */
            .news-page-wrapper {
                min-height: 100vh;
                background: ${tokens.color.bgLight};
                color: ${tokens.color.textDark};
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                padding-bottom: 60px;
            }

            .content-wrapper {
                max-width: ${tokens.spacing.maxWidth};
                margin: 0 auto;
                padding: 0 ${tokens.spacing.padding};
            }

            /* --- Grid Layout --- */
            .news-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 40px;
                margin-top: -60px; 
            }

            @media (min-width: 768px) {
                .news-grid {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 50px 30px;
                }
            }

            /* --- News Card Styling & Animation --- */
            .news-card {
                display: flex;
                flex-direction: column;
                background: ${tokens.color.bgLight};
                padding: 0;
                border-radius: 16px;
                border: 1px solid #E5E7EB;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                overflow: hidden;
                text-decoration: none;
                color: inherit;
                
                animation: fadeInSlideUp 0.8s backwards;
            }
            
            .news-card:hover {
                transform: translateY(-8px);
                border-color: ${tokens.color.primary};
                box-shadow: 0 15px 35px rgba(0, 123, 255, 0.25);
            }
            
            /* Image Container */
            .news-image-container {
                position: relative;
                width: 100%;
                height: 220px; /* Fixed height for visual consistency */
                overflow: hidden;
            }

            .news-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.4s ease;
            }

            .news-card:hover .news-image {
                transform: scale(1.05);
            }
            
            .news-icon-overlay {
                position: absolute;
                top: 15px;
                right: 15px;
                padding: 8px;
                border-radius: 50%;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            }

            .news-content {
                padding: 20px 25px 30px;
                flex-grow: 1;
            }

            .news-date {
                font-size: 0.85rem;
                font-weight: 600;
                color: ${tokens.color.textMuted};
                margin-bottom: 5px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .news-type {
                font-weight: 800;
            }

            .news-title {
                font-size: 1.4rem;
                font-weight: 800;
                color: ${tokens.color.textDark};
                line-height: 1.3;
                margin-bottom: 10px;
            }

            .news-description {
                font-size: 1rem;
                color: ${tokens.color.textMuted};
                line-height: 1.5;
                margin-bottom: 18px;
            }
            
            .news-card-cta {
                display: flex;
                align-items: center;
                font-weight: 700;
                color: ${tokens.color.primary};
                transition: transform 0.3s ease;
            }

            .news-card:hover .news-card-cta {
                transform: translateX(5px);
            }

            /* --- CTA Section --- */
            .cta-section {
                text-align: center;
                margin-top: 100px;
                padding: 50px 30px;
                background: ${tokens.color.primary};
                border-radius: 20px;
                box-shadow: 0 10px 40px ${tokens.color.shadowPrimary};
                color: ${tokens.color.bgLight};
                
                animation: pulseShadow 4s infinite ease-in-out;
            }

            .cta-section h2 {
                color: ${tokens.color.bgLight};
                font-size: 2.5rem;
                font-weight: 800;
                margin-bottom: 15px;
                letter-spacing: -1px;
            }

            .cta-section p {
                max-width: 700px;
                margin: 0 auto 30px auto;
                color: rgba(255, 255, 255, 0.85);
                line-height: 1.6;
            }

            .cta-button {
                background: ${tokens.color.bgLight};
                border: none;
                padding: 16px 36px;
                color: ${tokens.color.primary};
                border-radius: 10px;
                font-weight: 700;
                font-size: 1.1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }

            .cta-button:hover {
                background: #E0E0E0;
                transform: translateY(-2px);
            }
            
            /* --- Responsive Adjustments --- */
            @media (max-width: 992px) {
                .news-title {
                    font-size: 1.3rem;
                }
                .cta-section h2 {
                    font-size: 2.2rem;
                }
            }
            
            @media (max-width: 640px) {
                .news-grid {
                    gap: 30px;
                }
                .news-title {
                    font-size: 1.2rem;
                }
                .news-image-container {
                    height: 180px;
                }
                .news-content {
                    padding: 15px 20px 25px;
                }
                .cta-section h2 {
                    font-size: 1.75rem;
                }
                .cta-button {
                    padding: 14px 30px;
                    font-size: 1rem;
                }
            }
        `}</style>

        {/* --- PAGE HEADER --- */}
        <PageHeader
            title={"Capital Stay News & Accomplishments"}
            description={"Stay updated on our latest portfolio additions, awards, key partnerships, and service enhancements that drive innovation in luxury hospitality."}
            backgroundImage={"../assets/news-hero.webp"} 
            breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'News & Updates', href: '/news' }]}
        />
        
        <div className="content-wrapper">

            {/* NEWS GRID */}
            <div className="news-grid">
                {NEWS_FEED.map((item, index) => (
                    <NewsCard key={item.id} item={item} index={index} />
                ))}
            </div>

            {/* CTA */}
            <div className="cta-section">
                <h2>Join Our Journey of Excellence</h2>
                <p>
                    Follow us on social media or subscribe to our newsletter to receive real-time updates on
                    new properties, market insights, and exclusive guest events.
                </p>
                <button className="cta-button" onClick={() => window.open('https://example.com/subscribe', '_blank')}>
                    Subscribe to Newsletter
                </button>
            </div>
        </div>
    </div>
);

export default NewsAndAccomplishments;