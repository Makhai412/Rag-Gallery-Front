import React from 'react';

const TeamMember = ({ name, role, imgSrc, socialLinks }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={imgSrc} alt={name} className="w-32 h-32 rounded-full" />
      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{role}</p>
      <div className="mt-2 flex space-x-4">
        {socialLinks.map((link, index) => (
          <a href={link.url} key={index} target="_blank" rel="noopener noreferrer">
            <img src={link.icon} alt={link.name} className="w-6 h-6" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default TeamMember;
