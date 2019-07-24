package be.mytcc.scipio.controller;

import be.mytcc.scipio.model.communistSplit.CommunistSplitGroup;
import be.mytcc.scipio.model.communistSplit.CommunistSplitGroupRepository;
import be.mytcc.scipio.model.communistSplit.CommunistSplitPayment;
import be.mytcc.scipio.model.communistSplit.CommunistSplitPaymentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/communist-split")
public class CommunistSplitController {

    private Logger logger = LoggerFactory.getLogger(CommunistSplitController.class);

    @Autowired
    CommunistSplitPaymentRepository communistSplitPaymentRepository;

    @Autowired
    CommunistSplitGroupRepository communistSplitGroupRepository;

    @GetMapping("/{groupId}/payments")
    public List<CommunistSplitPayment> getAllPayments(@PathVariable long groupId) {
        return communistSplitPaymentRepository.findAllBySplitGroupId(groupId);
    }

    @GetMapping("/groups")
    public List<CommunistSplitGroup> getAllGroups(Principal principal){
        return communistSplitGroupRepository.findAllByUserId(principal.getName());
    }

}
