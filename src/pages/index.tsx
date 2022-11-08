import { useEffect, useState } from "react"
import { Checkbox, Heading, IconButton, Stack, Text } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { formatDateBr, getCurrentDate, addDaysToDate, subDaysFromDate, dateIsEqual } from "utils/dateUtil"
import challenges from "data/challenges.json"

export default function Home() {
  const [configDate, setConfigDate] = useState({
    today: "",
    firstDate: "",
  })

  useEffect(() => {
    let firstDate = localStorage.getItem("@rd_app:firstDate")

    const today = getCurrentDate()

    if (!firstDate) {
      localStorage.setItem("@rd_app:firstDate", today)
      firstDate = today
    }

    setConfigDate({
      today,
      firstDate,
    })
  }, [])

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = getCurrentDate()
    const formattedDate = formatDateBr(today)

    return {
      date: today,
      formattedDate,
    }
  })

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
          colorScheme="teal"
          aria-label="Voltar data"
          icon={<ChevronLeftIcon />}
          onClick={rewindTheDate}
          disabled={dateIsEqual(selectedDate.date, configDate.firstDate)}
        />

        <Text>{selectedDate.formattedDate}</Text>

        <IconButton
          variant="none"
          colorScheme="teal"
          aria-label="Avançar data"
          icon={<ChevronRightIcon />}
          onClick={advanceTheDate}
          disabled={dateIsEqual(configDate.today, selectedDate.date)}
        />
      </Stack>

      <Stack spacing={5}>
        <Heading fontSize="3xl" color="red.500">Hoje eu...</Heading>

        {challenges.map(challenger => (
          <Checkbox key={challenger.id} size="lg">
            {challenger.text}
          </Checkbox>
        ))}
      </Stack>
    </Stack>
  )
}
