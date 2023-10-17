import React from 'react';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { IntlProvider } from 'react-intl';
import { AuthorBox } from './AuthorBox';
import { Location } from '@logora/debate.util.location';
import { BrowserRouter } from 'react-router-dom';
import { faker } from '@faker-js/faker';

const author = {
  image_url: faker.image.avatar(),
  full_name: faker.name.fullName(),
  hash_id: faker.lorem.slug(),
  slug: faker.lorem.slug(),
  points: 52,
  last_activity: faker.date.recent(),
  description: faker.name.jobTitle(),
  is_expert: false
};

const expert_author = {
  image_url: faker.image.avatar(),
  full_name: faker.name.fullName(),
  hash_id: faker.lorem.slug(),
  slug: faker.lorem.slug(),
  points: 52,
  last_activity: new Date(),
  description: faker.name.jobTitle(),
  is_expert: true,
};

const routes = {
  userShowLocation: new Location('espace-debat/user/:userSlug', { userSlug: '' })
};

export const DefaultAuthorBox = () => {
  return (
    <BrowserRouter>
      <ConfigProvider routes={{ ...routes }}>
        <IntlProvider locale="en">
          <AuthorBox
            avatarUrl={author.image_url}
            hashId={author.hash_id}
            points={author.points}
            fullName={author.full_name}
            isExpert={author.is_expert}
            disableLinks
          />
        </IntlProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};

// export const AuthorBoxWithoutLink = () => {
//   return (
//     <BrowserRouter>
//       <ConfigProvider routes={{ ...routes }}>
//         <IntlProvider locale="en">
//           <AuthorBox
//           avatarUrl=""
//           hashId=""
//           points=""
//           eloquenceTitle=""
//           fullName=""
//           isExpert=""
//           hideUserInfo="" 
//           disableLinks={true} />
//         </IntlProvider>
//       </ConfigProvider>
//     </BrowserRouter>
//   );
// };

// export const AuthorBoxWithTitle = () => {
//     return (
//       <BrowserRouter>
//         <ConfigProvider routes={{ ...routes }}>
//           <IntlProvider locale="en">
//             <AuthorBox author={{ ...author, eloquence_title: faker.name.jobType() }} />
//           </IntlProvider>
//         </ConfigProvider>
//       </BrowserRouter>
//     );
// };

// export const AuthorBoxWithDescription = () => {
//   return (
//     <BrowserRouter>
//       <ConfigProvider routes={{ ...routes }}>
//         <IntlProvider locale="en">
//           <AuthorBox author={author} showDescription={true} />
//         </IntlProvider>
//       </ConfigProvider>
//     </BrowserRouter>
//   );
// };

// export const AuthorBoxWithOccupation = () => {
//     return (
//       <BrowserRouter>
//         <ConfigProvider routes={{ ...routes }}>
//           <IntlProvider locale="en">
//             <AuthorBox author={{ ...author, occupation: faker.name.jobTitle() }} />
//           </IntlProvider>
//         </ConfigProvider>
//       </BrowserRouter>
//     );
// };

// export const AuthorBoxWithoutUserInfo = () => {
//   return (
//     <BrowserRouter>
//       <ConfigProvider routes={{ ...routes }}>
//         <IntlProvider locale="en">
//           <AuthorBox author={author} hideUserInfo={true} />
//         </IntlProvider>
//       </ConfigProvider>
//     </BrowserRouter>
//   );
// };

// export const AuthorBoxExpert = () => {
//   return (
//     <BrowserRouter>
//       <ConfigProvider routes={{ ...routes }}>
//         <IntlProvider locale="en">
//           <AuthorBox author={expert_author} />
//         </IntlProvider>
//       </ConfigProvider>
//     </BrowserRouter>
//   );
// };