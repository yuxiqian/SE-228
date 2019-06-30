package com.yue.bookie.server.lib.controller

import com.yue.bookie.server.lib.service.BookieUtils
import com.yue.bookie.server.lib.service.RoleChecker
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController


@RestController
open class EnableUserController {
    @RequestMapping(value = ["/admin/enableuser"], method = [RequestMethod.POST], produces = ["application/json;charset=UTF-8"])
    @ResponseBody
    fun enableUser(userId: Int?): String
    {
        if (RoleChecker.getRole() != RoleChecker.adminRole) {
            return "{\"status\": \"unauthorized\"}"
        }
        return try {
            System.out.println(userId)
            BookieUtils.service.enableUser(userId)
            "{\"status\": \"ok\"}"
        } catch (ex: Exception) {
            ex.printStackTrace()
            "{\"status\": \"internal_error\"}"
        }
    }
}