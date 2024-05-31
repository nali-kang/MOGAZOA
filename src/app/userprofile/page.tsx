'use client';

import React from 'react';
import NavigationBar from '@/Components/Commons/NavigationBar/Navigationbar';
import UserProfileCard from '@/Components/Commons/Cards/UserprofileCard/UserprofileCard';
import UserActivityLogCard from '@/Components/Commons/Cards/UserActivityLogCard/UserActivityLogCard';

function UserProfilePage() {
  return (
    <>
      <NavigationBar firstTitle="로그인" secondTitle="회원가입" />
      <UserProfileCard />
      <UserActivityLogCard />
    </>
  );
}
export default UserProfilePage;
