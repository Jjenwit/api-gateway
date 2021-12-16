import { Request, Response } from 'express'
import { wrapAsync, getData } from '@shared/functions'
import { Trip } from '@shared/interfaces'

// Trips-Controller
export const tripsController = wrapAsync(async (req: Request, res: Response) => {
     const k = req.query.keyword as string // Get query string
     const response = await getData() // Get data from database

     const result: Trip[] = [] // Initialize result

     if (response && response.data) {
          const data = response.data as Trip[]

          // If there is no keyword, send all data to frontend
          if (!k) {
               res.send(data)
          }

          // loop through the data to begin searching
          data.forEach((trip) => {
               const { title, description, tags } = trip

               // Joined the array of string to simplified searching
               const joinedTags = tags.join(' ')

               // Normalize the keyword and data for searching
               const nTitle = title.toLowerCase()
               const nDescription = description.toLowerCase()
               const nJoinedTags = joinedTags.toLowerCase()
               const nK = k.toLowerCase()

               // Compare the keyword with data and push the object to result array
               if (nTitle.includes(nK) || nDescription.includes(nK) || nJoinedTags.includes(nK)) {
                    result.push(trip)
               }
          })
     }

     res.send(result)
})
