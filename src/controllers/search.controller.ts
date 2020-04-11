import axios from 'axios'
import { Request } from 'express'

export class SearchController {
    public index(req: Request) {

        var date = new Date();
        var current_hour = date.getHours();

        return axios({
            url: `${process.env.SEARCH_API_URL}/search`,
            params: {
                location: req.query.location,
                puDate: req.query.puDate,
                puTime: req.query.puTime || `${current_hour+1}:00`,
                doDate: req.query.doDate,
                doTime: req.query.doTime || `${current_hour+1}:00`,
                currency: req.query.currency,
                country: req.query.country,
                json: true,
            }
        })
            .then(r => r.data)
            .then(xml => {
                return xml;
            })
    }

    public async iataCodes(req: Request) {

        return axios({
            url: `${process.env.SEARCH_API_URL}/getiatacodes`,
            method: 'GET'
        })
            .then(r => r.data)
    }
}