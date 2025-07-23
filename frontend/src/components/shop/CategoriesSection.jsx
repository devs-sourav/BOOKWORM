import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const CategoriesSection = () => {
  const [expanded, setExpanded] = useState({});

  const toggleCategory = (name) => {
    setExpanded((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

    const categories = [
    { name: 'Arts & Photography', href: '/category/arts-photography' },
    { name: 'Baby', href: '/category/baby' },
    { 
      name: 'Biographies & Memoirs', 
      href: '/category/biographies-memoirs',
      children: [
        { name: 'Arts & Literature', href: '/category/biographies-memoirs/arts-literature' }
      ]
    },
    { name: 'Biography', href: '/category/biography' },
    { name: 'Business & Money', href: '/category/business-money' },
    { name: 'BWafts', href: '/category/bwafts' },
    { name: 'Children', href: '/category/children' },
    {
      name: 'Christian Books & Bibles',
      href: '/category/christian-books-bibles',
      children: [
        { name: 'Christian Living', href: '/category/christian-books-bibles/christian-living' }
      ]
    },
    { name: 'Cookbooks', href: '/category/cookbooks' },
    {
      name: 'Food & Drink',
      href: '/category/food-drink',
      children: [
        { name: 'Beverages', href: '/category/food-drink/beverages' },
        { name: 'Celebrity Chefs', href: '/category/food-drink/celebrity-chefs' },
        { name: 'Cigars & Smoking', href: '/category/food-drink/cigars-smoking' },
        { name: 'Cookery By Ingredient', href: '/category/food-drink/cookery-by-ingredient' }
      ]
    },
    {
      name: 'Food & Wine',
      href: '/category/food-wine',
      children: [
        { name: 'Cooking Education & Reference', href: '/category/food-wine/cooking-education-reference' }
      ]
    },
    {
      name: 'Health',
      href: '/category/health',
      children: [
        { name: 'Advice On Parenting', href: '/category/health/advice-on-parenting' },
        { name: 'Coping With Personal Problems', href: '/category/health/coping-with-personal-problems' },
        { name: 'Family & Relationships', href: '/category/health/family-relationships' },
        { name: 'Fitness & Diet', href: '/category/health/fitness-diet' },
        { name: 'Giving Up Smoking', href: '/category/health/giving-up-smoking' }
      ]
    },
    {
      name: 'History',
      href: '/category/history',
      children: [
        { name: 'Americas', href: '/category/history/americas' },
        { name: 'World', href: '/category/history/world' }
      ]
    },
    {
      name: 'Hobbies & Home',
      href: '/category/hobbies-home',
      children: [
        { name: 'Home Improvement & Design', href: '/category/hobbies-home/home-improvement-design' }
      ]
    },
    {
      name: 'Humor & Entertainment',
      href: '/category/humor-entertainment',
      children: [
        { name: 'Movies', href: '/category/humor-entertainment/movies' },
        { name: 'Television', href: '/category/humor-entertainment/television' }
      ]
    },
    {
      name: 'Literature & Fiction',
      href: '/category/literature-fiction',
      children: [
        { name: 'Genre Fiction', href: '/category/literature-fiction/genre-fiction' },
        { name: 'History & Criticism', href: '/category/literature-fiction/history-criticism' }
      ]
    },
    {
      name: 'Love',
      href: '/category/love',
      children: [
        { name: 'Historical', href: '/category/love/historical' }
      ]
    },
    { name: 'Mystery', href: '/category/mystery' },
    {
      name: 'Politics & Social Sciences',
      href: '/category/politics-social-sciences',
      children: [
        {
          name: 'Politics & Government',
          href: '/category/politics-social-sciences/politics-government',
          children: [
            {
              name: 'Specific Topics',
              href: '/category/politics-social-sciences/politics-government/specific-topics',
              children: [
                { name: 'Intelligence & Espionage', href: '/category/politics-social-sciences/politics-government/specific-topics/intelligence-espionage' }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'Reference',
      href: '/category/reference',
      children: [
        { name: 'Writing', href: '/category/reference/writing' }
      ]
    },
    {
      name: 'Religion & Spirituality',
      href: '/category/religion-spirituality',
      children: [
        { name: 'Rituals & Practice', href: '/category/religion-spirituality/rituals-practice' }
      ]
    },
    { name: 'Research & Publishing Guides', href: '/category/research-publishing-guides' },
    {
      name: 'Romance',
      href: '/category/romance',
      children: [
        { name: 'Cookery Dishes & Courses', href: '/category/romance/cookery-dishes-courses' },
        { name: 'Historical Romance', href: '/category/romance/historical-romance' },
        { name: 'Home Nursing & Caring', href: '/category/romance/home-nursing-caring' },
        { name: 'Popular Medicine & Health', href: '/category/romance/popular-medicine-health' },
        { name: 'Safety In The Home', href: '/category/romance/safety-in-the-home' }
      ]
    },
    { name: 'Sports', href: '/category/sports' },
    {
      name: 'Sports & Outdoors',
      href: '/category/sports-outdoors',
      children: [
        { name: 'Contemporary', href: '/category/sports-outdoors/contemporary' }
      ]
    },
    {
      name: 'Thriller & Suspense',
      href: '/category/thriller-suspense',
      children: [
        { name: 'Mystery', href: '/category/thriller-suspense/mystery' },
        { name: 'Thriller & Suspense', href: '/category/thriller-suspense/thriller-suspense' }
      ]
    },
    { name: 'Uncategorized', href: '/category/uncategorized' }
  ];

  const renderCategoryItem = (category, level = 0) => {
    const hasChildren = !!category.children?.length;
    const isExpanded = expanded[category.name];

    return (
      <li key={category.name} className={`pl-${level * 4} py-1`}>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => hasChildren && toggleCategory(category.name)}
        >
          <a
            href={category.href}
            className="text-gray-800 hover:text-blue-600 text-sm block"
          >
            {category.name}
          </a>
          {hasChildren && (
            <span className="ml-2 text-gray-500">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
        </div>

        {hasChildren && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? 'max-h-[1000px] mt-1' : 'max-h-0'
            }`}
          >
            <ul className="pl-4 border-l border-gray-200">
              {category.children.map((child) => renderCategoryItem(child, level + 1))}
            </ul>
          </div>
        )}
      </li>
    );
  };

  return (
    <ul className="space-y-1 px-6 pb-6">
      {categories.map((category) => renderCategoryItem(category))}
    </ul>
  );
};

export default CategoriesSection;
