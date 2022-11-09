import { useEffect, useState } from "react"
import { Checkbox, Heading, IconButton, Stack, Text } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { formatDateBr, getCurrentDate, addDaysToDate, subDaysFromDate, dateIsEqual } from "utils/dateUtil"
import challengesData from "data/challenges.json"

export default function Home() {
  const [configDate, setConfigDate] = useState({
    today: "",
    firstDate: "",
  })

  const [challenges, setChallenges] = useState(challengesData)

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = getCurrentDate()
    const formattedDate = formatDateBr(today)

    return {
      date: today,
      formattedDate,
    }
  })

  useEffect(() => {
    let firstDate = localStorage.getItem("@rd_desafios:firstDate")

    const today = getCurrentDate()

    if (!firstDate) {
      localStorage.setItem("@rd_desafios:firstDate", today)
      firstDate = today
    }

    setConfigDate({
      today,
      firstDate,
    })

    setStorageChallengesInTheState(today)
  }, [])

  useEffect(() => {
    setStorageChallengesInTheState(selectedDate.date)
  }, [selectedDate.date])

  const setStorageChallengesInTheState = (key: string) => {
    const challengesJSON = localStorage.getItem("@rd_desafios:challenges")

    try {
      if (!challengesJSON) throw new Error("No challenges")

      const challengesStorage = JSON.parse(challengesJSON)

      const todayChallenges = challengesStorage[key]

      if (!todayChallenges) {
        const challengesJSONInput = JSON.stringify({
          ...challengesStorage,
          [key]: challengesData,
        })

        localStorage.setItem("@rd_desafios:challenges", challengesJSONInput)

        setChallenges(challengesData)
      }
      else {
        setChallenges(todayChallenges)
      }
    } catch {
      const challengesJSONInput = JSON.stringify({
        [key]: challengesData,
      })

      localStorage.setItem("@rd_desafios:challenges", challengesJSONInput)

      setChallenges(challengesData)
    }
  }

  const updateStorageChallenges = (data: any) => {
    const challengesJSON = localStorage.getItem("@rd_desafios:challenges")

    try {
      if (!challengesJSON) throw new Error("No challenges")

      const challengesStorage = JSON.parse(challengesJSON)

      challengesStorage

      const parsedData = JSON.stringify({
        ...challengesStorage,
        [selectedDate.date]: data,
      })

      localStorage.setItem("@rd_desafios:challenges", parsedData)
    }
    catch { }
  }

  const rewindTheDate = () => {
    const dateBackwards = subDaysFromDate(selectedDate.date)
    const formattedDate = formatDateBr(dateBackwards)

    setSelectedDate({
      date: dateBackwards,
      formattedDate,
    })
  }

  const advanceTheDate = () => {
    const advancedDate = addDaysToDate(selectedDate.date)
    const formattedDate = formatDateBr(advancedDate)

    setSelectedDate({
      date: advancedDate,
      formattedDate,
    })
  }

  const changeTheChallengerState = (id: string) => {
    const modifiedChallenges = challenges.map(challenge => {
      if (challenge.id === id) return {
        ...challenge,
        isChecked: !challenge.isChecked,
      }
      else return challenge
    })

    setChallenges(modifiedChallenges)

    updateStorageChallenges(modifiedChallenges)
  }

  return (
    <Stack maxWidth="600px" padding="40px 24px" margin="0 auto" spacing="6">
      <Stack align="center">
        <Heading
          fontSize="md"
          letterSpacing="6px"
          fontWeight="light"
        >
          DESAFIO
        </Heading>

        <Heading
          as="h1"
          fontSize="4xl"
          letterSpacing="4px"
          color="red.500"
        >
          #RD30
        </Heading>
      </Stack>

      <Stack spacing="4" align="center" justify="center" isInline>
        <IconButton
          variant="none"
          aria-label="Voltar data"
          icon={<ChevronLeftIcon />}
          onClick={rewindTheDate}
          disabled={dateIsEqual(selectedDate.date, configDate.firstDate)}
        />

        <Text>{selectedDate.formattedDate}</Text>

        <IconButton
          variant="none"
          aria-label="Avançar data"
          icon={<ChevronRightIcon />}
          onClick={advanceTheDate}
          disabled={dateIsEqual(configDate.today, selectedDate.date)}
        />
      </Stack>

      <Stack spacing={5}>
        <Heading fontSize="3xl" color="red.500">Hoje eu...</Heading>

        {challenges.map(challenger => (
          <Checkbox
            key={challenger.id}
            size="lg"
            isChecked={challenger.isChecked}
            onChange={() => changeTheChallengerState(challenger.id)}
          >
            {challenger.text}
          </Checkbox>
        ))}
      </Stack>
    </Stack>
  )
}
