'use client';

import React from 'react';
import NavigationBar from '@/Components/Commons/NavigationBar/Navigationbar';
import UserProfileCard from '@/Components/Commons/Cards/UserprofileCard/UserprofileCard';

function UserProfilePage() {
  return (
    <>
      <NavigationBar firstTitle="로그인" secondTitle="회원가입" />
      <UserProfileCard />
    </>
  );
}
export default UserProfilePage;
