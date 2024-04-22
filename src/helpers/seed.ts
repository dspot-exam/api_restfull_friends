import { faker } from '@faker-js/faker';

export const generateProfileData = () => ({
  img: faker.image.avatar(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  phone: faker.phone.number(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  zipcode: faker.location.zipCode(),
  available: faker.datatype.boolean(),
});

export const createFakeProfiles = (numProfiles) => {
  const profiles = [];
  for (let i = 0; i < numProfiles; i++) {
    const profileData = generateProfileData();
    profiles.push(profileData);
  }
  return profiles;
};

export const createFakeConnections = (profiles, total) => {
  const data = [];

  for (let i = 0; i < total; i++) {
    let profileId1 = null;
    const profileId2 = profiles[Math.floor(Math.random() * profiles.length)].id;

    while (profileId1 === profileId2 || profileId1 === null) {
      profileId1 = profiles[Math.floor(Math.random() * profiles.length)].id;
    }

    data.push({ profileId1, profileId2 });
  }

  return data;
};
