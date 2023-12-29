import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

final router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (BuildContext context, GoRouterState state) {
        throw UnimplementedError();
      },
      routes: [
        GoRoute(
          path: 'details',
          builder: (BuildContext context, GoRouterState state) {
            throw UnimplementedError();
          },
        ),
      ],
    ),
  ],
);
