package be.mytcc.scipio.controller.communistSplit;

import be.mytcc.scipio.bot.listener.communistSplit.CommunistSplitListener;
import be.mytcc.scipio.model.common.User;
import be.mytcc.scipio.model.common.UserRepository;
import be.mytcc.scipio.model.communistSplit.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/communist-split")
public class CommunistSplitController {

    private Logger logger = LoggerFactory.getLogger(CommunistSplitController.class);

    @Autowired
    private CommunistSplitPaymentRepository communistSplitPaymentRepository;

    @Autowired
    private CommunistSplitGroupRepository communistSplitGroupRepository;

    @Autowired
    private CommunistSplitPaymentUserRepository communistSplitPaymentUserRepository;

    @Autowired
    private CommunistSplitListener communistSplitListener;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{groupId}/payments")
    public List<CommunistSplitPayment> getAllPayments(@PathVariable long groupId) {
        return communistSplitPaymentRepository.findAllBySplitGroupId(groupId);
    }

    @GetMapping("/groups/{groupId}")
    public CommunistSplitGroup getGroup(@PathVariable long groupId){
        return communistSplitGroupRepository.findById(groupId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Group not found"));
    }

    @GetMapping("/groups")
    public List<CommunistSplitGroup> getAllGroups(@RequestAttribute("user") User user) {
        return communistSplitGroupRepository.findByUsers_keycloakId(user.getKeycloakId());
    }

    @PostMapping("/payments")
    public CommunistSplitPayment createNewPayment(@RequestBody CommunistSplitPayment communistSplitPayment) {
        communistSplitPayment.getSplitPaymentUsers().forEach(communistSplitPaymentUser -> {
            communistSplitPaymentUser.setPayment(communistSplitPayment);
            communistSplitPaymentUser.setOwes((float)Math.round(communistSplitPaymentUser.getOwes() * 100) / 100);
        });
        communistSplitPayment.setAmount((double)Math.round(communistSplitPayment.getAmount() * 100) / 100);
        CommunistSplitPayment createdPayment = communistSplitPaymentRepository.save(communistSplitPayment);
        communistSplitListener.createNewPayment(createdPayment);
        return createdPayment;
    }

    @GetMapping("/{groupId}/users")
    public List<User> getAllUsersInGroup(@PathVariable long groupId) {
        return userRepository.findUserByCommunistSplitGroups_id(groupId);
    }

    @GetMapping("/payments/{paymentId}")
    public CommunistSplitPayment getPayment(@PathVariable long paymentId) {
        return communistSplitPaymentRepository.findById(paymentId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "This payment doesn't exist"));
    }

}
