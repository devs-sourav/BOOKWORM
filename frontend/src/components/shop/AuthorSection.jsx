import React from 'react';

const AuthorSection = () => {
  const authors = [
    { name: 'A G Riddle', count: 3, href: '/shop?author=a-g-riddle' },
    { name: 'Andre Aciman', count: 2, href: '/shop?author=andre-aciman' },
    { name: 'Anna Banks', count: 6, href: '/shop?author=anna-banks' },
    { name: 'Anna Burns', count: 2, href: '/shop?author=anna-burns' },
    { name: 'Ashlee Vance', count: 2, href: '/shop?author=ashlee-vance' },
    { name: "Barbara O'Neal", count: 1, href: '/shop?author=barbara-oneal' },
    { name: 'Blake Crouch', count: 1, href: '/shop?author=blake-crouch' },
    { name: 'Boo Walker', count: 1, href: '/shop?author=boo-walker' },
    { name: 'Brian Greene', count: 1, href: '/shop?author=brian-greene' },
    { name: 'Britney King', count: 1, href: '/shop?author=britney-king' },
    { name: 'Colleen Hoover', count: 2, href: '/shop?author=colleen-hoover' },
    { name: 'Conn Iggulden', count: 5, href: '/shop?author=conn-iggulden' },
    { name: 'Dean Nicholson', count: 1, href: '/shop?author=dean-nicholson' },
    { name: 'Delia Owens', count: 1, href: '/shop?author=delia-owens' },
    { name: 'Donna Kauffman', count: 2, href: '/shop?author=donna-kauffman' },
    { name: 'Dorothea Benton Frank', count: 1, href: '/shop?author=dorothea-benton-frank' },
    { name: 'Douglas Kennedy', count: 2, href: '/shop?author=douglas-kennedy' },
    { name: 'Edward Lee', count: 3, href: '/shop?author=edward-lee' },
    { name: 'Emily March', count: 1, href: '/shop?author=emily-march' },
    { name: 'G.K. Parks', count: 1, href: '/shop?author=g-k-parks' },
    { name: 'Gordon Corera', count: 1, href: '/shop?author=gordon-corera' },
    { name: 'Hilarie Burton', count: 2, href: '/shop?author=hilarie-burton' },
    { name: 'J. D. Robb', count: 2, href: '/shop?author=j-d-robb' },
    { name: 'James Patterson', count: 1, href: '/shop?author=james-patterson' },
    { name: 'James Wallace', count: 1, href: '/shop?author=james-wallace' },
    { name: 'Jay Shetty', count: 3, href: '/shop?author=jay-shetty' },
    { name: 'Jessica Simpson', count: 4, href: '/shop?author=jessica-simpson' },
    { name: 'John Grisham', count: 1, href: '/shop?author=john-grisham' },
    { name: 'Joshua Whitehead', count: 1, href: '/shop?author=joshua-whitehead' },
    { name: 'Kelly Harms', count: 6, href: '/shop?author=kelly-harms' },
    { name: 'Kendra Elliot', count: 1, href: '/shop?author=kendra-elliot' },
    { name: 'Kristin Hannah', count: 2, href: '/shop?author=kristin-hannah' },
    { name: 'L T Vargus', count: 2, href: '/shop?author=l-t-vargus' },
    { name: 'L.J. Shen', count: 1, href: '/shop?author=l-j-shen' },
    { name: 'Luanne Rice', count: 2, href: '/shop?author=luanne-rice' },
    { name: 'Mary Beth Keane', count: 2, href: '/shop?author=mary-beth-keane' },
    { name: 'Max Lucado', count: 2, href: '/shop?author=max-lucado' },
    { name: 'Mitch Weiss', count: 1, href: '/shop?author=mitch-weiss' },
    { name: 'Nicole Chung', count: 1, href: '/shop?author=nicole-chung' },
    { name: 'Nora Roberts', count: 7, href: '/shop?author=nora-roberts' },
    { name: 'Patrick Taylor', count: 1, href: '/shop?author=patrick-taylor' },
    { name: 'Pieter du Toit', count: 1, href: '/shop?author=pieter-du-toit' },
    { name: 'Robert Iger', count: 1, href: '/shop?author=robert-iger' },
    { name: 'Stassi Schroeder', count: 1, href: '/shop?author=stassi-schroeder' },
    { name: 'Stephen King', count: 1, href: '/shop?author=stephen-king' },
    { name: 'Suzanne Enoch', count: 1, href: '/shop?author=suzanne-enoch' },
    { name: 'Tara Westover', count: 1, href: '/shop?author=tara-westover' },
    { name: 'Victoria Jenkins', count: 1, href: '/shop?author=victoria-jenkins' },
    { name: 'Viktor E. Frankl', count: 1, href: '/shop?author=viktor-e-frankl' }
  ];

  return (
    <ul className="space-y-1 px-6 pb-6">
      {authors.map((author) => (
        <li key={author.name}>
          <a
            href={author.href}
            className="text-gray-700 hover:text-blue-600 text-sm py-1 block transition-colors flex justify-between"
          >
            <span>{author.name}</span>
            <span className="text-gray-500">({author.count})</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default AuthorSection;
