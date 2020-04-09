import axios from 'axios'
import { Request } from 'express'

export class SearchController {
    public index(req: Request) {

        return axios({
            url: `${process.env.SEARCH_API_URL}/search`,
            params: {
                location: req.params.location,
                puDate: req.params.puDate,
                puTime: req.params.puTime,
                doDate: req.params.doDate,
                doTime: req.params.doTime,
                currency: req.params.currency,
                country: req.params.country,
                json: true,
            }
        })
            .then(r => r.data)
            .then(xml => {
                console.log(xml)
                return { success: true };
            })
    }

    public async iataCodes(req: Request) {

        return axios({
            url: `${process.env.SEARCH_API_URL}/iatacodes`,
        })
            .then(r => r.data)
    }
}