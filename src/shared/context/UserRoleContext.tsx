import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'member' | 'host';

type UserRoleContextType = {
  role: UserRole;
  setRole: (role: UserRole) => void;
};

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
  // TODO: idealnya nilai awal ini di-restore dari AsyncStorage/session,
  // biar kalau app di-reload, role-nya nggak balik ke default.
  const [role, setRole] = useState<UserRole>('member');

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
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