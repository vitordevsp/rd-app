import { useState } from "react"
import { Checkbox, Heading, Stack, Text } from "@chakra-ui/react"
import { formatDateBr, getCurrentDate, addDaysToDate, subDaysFromDate } from "utils/dateUtil"
import challenges from "data/challenges.json"

export default function Home() {
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

      <Stack spacing="6" justify="center" isInline>
        <Text onClick={rewindTheDate}>{"<"}</Text>
        <Text>{selectedDate.formattedDate}</Text>
        <Text onClick={advanceTheDate}>{">"}</Text>
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
