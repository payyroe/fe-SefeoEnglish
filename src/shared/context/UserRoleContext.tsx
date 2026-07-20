import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'member' | 'host';
export type MembershipTier = 'regular' | 'vip';

type UserRoleContextType = {
  role: UserRole;
  setRole: (role: UserRole) => void;
  membershipTier: MembershipTier;
  setMembershipTier: (tier: MembershipTier) => void;
};

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
  // TODO: idealnya kedua nilai awal ini di-restore dari AsyncStorage/session/API,
  // biar kalau app di-reload, role & tier-nya nggak balik ke default.
  const [role, setRole] = useState<UserRole>('member');
  const [membershipTier, setMembershipTier] = useState<MembershipTier>('regular');

  return (
    <UserRoleContext.Provider value={{ role, setRole, membershipTier, setMembershipTier }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
}