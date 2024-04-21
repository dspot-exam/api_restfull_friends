import { faker } from '@faker-js/faker';

const generateProfileData = () => ({
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
