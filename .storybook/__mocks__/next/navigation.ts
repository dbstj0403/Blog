// .storybook/__mocks__/next/navigation.ts
export const useRouter = () => ({
  push: () => {
    console.log('router.push called - mock');
  },
});
