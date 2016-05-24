<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class RegisterController extends Controller
{
    /**
     * @Route("/register", name="register")
     */
    public function indexAction(Request $request)
    {
      return $this->render('auth/register.html.twig', array(
          'base_dir' => realpath($this->container->getParameter('kernel.root_dir').'/..'),
      ));
    }

    /**
     * @Route("/register/user", name="register_user")
     */
    public function registerAction(Request $request)
    {
      $user_data = $request->request->all();
      // TODO: vaildate agains xss and implement record attempt to DB (with potential errors catcher)
      return new JsonResponse(array('user_data' => $user_data));
    }
}
