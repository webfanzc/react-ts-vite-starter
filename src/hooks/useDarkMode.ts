import { setDarkClass } from '~/utils/browser'

export function useDarkMode(): [boolean, (val?: boolean) => void] {
  const [isDarkMode, setDarkMode] = useLocalStorageState('useDarkMode', {
    defaultValue: false,
  })

  const toggleDark = (val?: boolean) => {
    setDarkMode(val ?? !isDarkMode)
  }

  useEffect(() => {
    setDarkClass(isDarkMode)
  }, [isDarkMode])

  return [isDarkMode, toggleDark]
}
